# Mentions de licences tierces

Ce fichier recense les composants tiers distribués avec l'application
NESTA et leurs licences.

---

## NIMA — Neural Image Assessment (composante esthétique de NESTA Capture)

- Projet d'origine : https://github.com/titu1994/neural-image-assessment
- Auteur : Somshubra Majumdar
- Licence : MIT (texte intégral ci-dessous)

Utilisation dans NESTA : l'architecture du modèle (MobileNet + couche
dense de distribution de notes 1–10) a été convertie en TensorFlow.js
(`public/models/nima-mobilenet/`) et s'exécute entièrement dans le
navigateur de l'utilisateur. Aucun entraînement supplémentaire n'a été
effectué. Le résultat du modèle est une composante interne et non
affichée du score photo NESTA ; les termes « NIMA », « TensorFlow »,
« MobileNet », « AI » et « machine learning » ne sont jamais présentés
à l'utilisateur.

```
MIT License

Copyright (c) 2018 Somshubra Majumdar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
