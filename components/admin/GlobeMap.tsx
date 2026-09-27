"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { MapPoint } from "@/actions/admin";

/* ============================================================
 * NESTA Admin — Globe 3D des biens.
 *
 * Globe three.js sur mesure (aucune texture externe) :
 * sphère forêt profonde + graticule subtil + points champagne.
 * - point plein  = coordonnées réelles en base (précis)
 * - anneau      = regroupement par ville (approximatif)
 * Survol : infobulle avec le libellé réel. Rien n'est inventé.
 * ============================================================ */

const GLOBE_R = 1;
const COLOR_SPHERE = 0x0e2a23; // forest-deep
const COLOR_GRATICULE = 0x2a443b;
const COLOR_PRECISE = 0xc3a877; // champagne
const COLOR_CITY = 0xf7f5ef; // ivory

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function buildGraticule(): THREE.LineSegments {
  const pts: number[] = [];
  const push = (a: THREE.Vector3, b: THREE.Vector3) => {
    pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
  };
  // Parallèles tous les 20°.
  for (let lat = -80; lat <= 80; lat += 20) {
    let prev: THREE.Vector3 | null = null;
    for (let lng = -180; lng <= 180; lng += 4) {
      const p = latLngToVec3(lat, lng, GLOBE_R + 0.001);
      if (prev) push(prev, p);
      prev = p;
    }
  }
  // Méridiens tous les 20°.
  for (let lng = -180; lng < 180; lng += 20) {
    let prev: THREE.Vector3 | null = null;
    for (let lat = -90; lat <= 90; lat += 4) {
      const p = latLngToVec3(lat, lng, GLOBE_R + 0.001);
      if (prev) push(prev, p);
      prev = p;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  const mat = new THREE.LineBasicMaterial({
    color: COLOR_GRATICULE,
    transparent: true,
    opacity: 0.55,
  });
  return new THREE.LineSegments(geo, mat);
}

export function GlobeMap({ points }: { points: MapPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    sub: string;
  } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 3.1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 1.7;
    controls.maxDistance = 6;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;

    const globe = new THREE.Group();
    scene.add(globe);

    // Sphère + graticule.
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_R, 64, 64),
      new THREE.MeshBasicMaterial({ color: COLOR_SPHERE }),
    );
    globe.add(sphere);
    globe.add(buildGraticule());

    // Halo discret (sprite radial dessiné sur canvas, aucune image externe).
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = haloCanvas.height = 256;
    const hctx = haloCanvas.getContext("2d");
    if (hctx) {
      const grad = hctx.createRadialGradient(128, 128, 90, 128, 128, 128);
      grad.addColorStop(0, "rgba(195,168,119,0)");
      grad.addColorStop(0.75, "rgba(195,168,119,0.10)");
      grad.addColorStop(1, "rgba(195,168,119,0)");
      hctx.fillStyle = grad;
      hctx.fillRect(0, 0, 256, 256);
    }
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(haloCanvas),
        transparent: true,
        depthWrite: false,
      }),
    );
    halo.scale.setScalar(3.4);
    scene.add(halo);

    // Points.
    const pickables: THREE.Object3D[] = [];
    const pointMeshes = new THREE.Group();
    for (const p of points) {
      const pos = latLngToVec3(p.lat, p.lng, GLOBE_R + 0.012);
      if (p.kind === "precise") {
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(p.count > 1 ? 0.022 : 0.016, 16, 16),
          new THREE.MeshBasicMaterial({ color: COLOR_PRECISE }),
        );
        dot.position.copy(pos);
        dot.userData = { label: p.label, sub: p.city, kind: p.kind };
        pointMeshes.add(dot);
        pickables.push(dot);
      } else {
        // Anneau = regroupement approximatif par ville.
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.028, 0.038, 32),
          new THREE.MeshBasicMaterial({
            color: COLOR_CITY,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide,
          }),
        );
        ring.position.copy(pos);
        ring.lookAt(pos.clone().multiplyScalar(2));
        ring.userData = { label: p.label, sub: "Position approximative (ville)", kind: p.kind };
        const core = new THREE.Mesh(
          new THREE.SphereGeometry(0.012, 12, 12),
          new THREE.MeshBasicMaterial({ color: COLOR_CITY }),
        );
        core.position.copy(pos);
        core.userData = ring.userData;
        pointMeshes.add(ring, core);
        pickables.push(ring, core);
      }
    }
    globe.add(pointMeshes);

    // Centrage initial sur le Québec.
    globe.rotation.y = -1.35;

    // Infobulle au survol.
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickables, false);
      if (hits.length > 0) {
        const u = hits[0].object.userData as { label: string; sub: string };
        setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, label: u.label, sub: u.sub });
        renderer.domElement.style.cursor = "pointer";
        controls.autoRotate = false;
      } else {
        setTooltip(null);
        renderer.domElement.style.cursor = "grab";
        controls.autoRotate = true;
      }
    };
    renderer.domElement.addEventListener("pointermove", onMove);

    // Redimensionnement.
    const observer = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    observer.observe(container);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointermove", onMove);
      controls.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [points]);

  if (failed) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl bg-forest-ink p-8 text-center">
        <p className="text-sm text-ivory/70">
          La 3D n’est pas disponible sur cet appareil. Les chiffres ci-dessus restent exacts.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-forest-ink">
      <div ref={containerRef} className="absolute inset-0" />
      {/* Légende */}
      <div className="pointer-events-none absolute left-4 top-4 space-y-1.5 rounded-xl bg-black/30 px-3 py-2.5 backdrop-blur-sm">
        <p className="flex items-center gap-2 text-xs text-ivory/85">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-champagne" />
          Adresse exacte en base
        </p>
        <p className="flex items-center gap-2 text-xs text-ivory/85">
          <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-ivory" />
          Regroupé par ville (approximatif)
        </p>
      </div>
      {/* Infobulle */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 max-w-56 -translate-x-1/2 rounded-lg bg-charcoal/95 px-3 py-2 shadow-xl"
          style={{ left: tooltip.x, top: tooltip.y - 12, transform: "translate(-50%, -100%)" }}
        >
          <p className="text-xs font-semibold text-ivory">{tooltip.label}</p>
          <p className="mt-0.5 text-[11px] text-ivory/60">{tooltip.sub}</p>
        </div>
          )}
      {points.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <p className="max-w-xs text-sm text-ivory/70">
            Aucun bien à afficher pour le moment. Les biens publiés avec une adresse apparaîtront ici.
          </p>
        </div>
      )}
    </div>
  );
}
