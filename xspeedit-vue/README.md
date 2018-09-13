# Packbot

Application web permettant d'emballer une chaîne d'articles, en optimisant le nombre de colis.

## Démarrer l'application

L'application tourne sur un server NodeJS. Pour démarrer l'application, veuillez lancer les commandes suivantes : 

```
npm install
npm run serve
```

L'application est accessible depuis votre navigateur à l'adresse [`http://localhost:8080`](http://localhost:8080).

## Algorithme

Packbot va tout d'abord trier les articles, et les retirer un à un en commençant par ceux de plus grande taille. Il va ensuite parcourir la chaîne des cartons déballés, et va insérer l'article dans un carton où il reste encore de la place. S'il ne trouve pas de place dans les cartons déballés, il va déballer un nouveau carton et insérer l'article dans celui-ci.  

En commençant par les articles de plus grandes tailles, Packbot fait en sorte de remplir de manière optimale le carton avec des articles de plus petites tailles, et si possible utiliser toute la place disponible du carton. Et ainsi éviter qu'un carton ne contienne que quelques articles de petites tailles, ce qui empêcherait l'insertion d'un autre article de grande taille, et obligerait donc de déballer un nouveau carton.
