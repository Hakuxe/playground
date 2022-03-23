// nome do cache atual
var cacheName = "pao-duro-app-v1.0";

// Armazena todos os arquivos no cache pao-duro-app-v1.0
self.addEventListener("install", function (event) {
	caches.open(cacheName).then((cache) => {
		cache.addAll([
			"/",
			"/index.html",
			"/manifest.webmanifest",

         //styles
			"/styles/global.css",
			"/styles/styles.css",

         // scripts
			"/js/index.js",
			"/js/database.js",
			"/js/utils.js",
			"/js/transactions.js",
			"/js/formTransaction.js",
			"/js/modal.js",
			
         // assets
			"/assets/add_black_24dp.svg",
			"/assets/delete.svg",
			"/assets/edit.svg",
			"/assets/navigate_next.svg",
			"/assets/trending_down.svg",
			"/assets/trending_up.svg",
			"/assets/favicon.ico",

			// assets android icons
			"/assets/icons/android-icon-36x36.png",
			"/assets/icons/android-icon-48x48.png",
			"/assets/icons/android-icon-72x72.png",
			"/assets/icons/android-icon-96x96.png",
			"/assets/icons/android-icon-144x144.png",
			"/assets/icons/android-icon-192x192.png",

         // assets apple icons
			"/assets/icons/apple-icon-72x72.png",
			"/assets/icons/apple-icon-120x120.png",
			"/assets/icons/apple-icon-144x144.png",
			"/assets/icons/apple-icon-152x152.png",
			"/assets/icons/apple-icon-180x180.png",
		]);
	});
});

// Recupera todos os nomes de cache e apaga aqueles
// que forem diferentes do cache atual
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== cacheName) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

// Tenta servir o arquivo do cache atual. Se não for possível,
// baixa o recurso da web e o armazena localmente, antes de entregar
// uma cópia para o usuário.
self.addEventListener("fetch", function (event) {
	let response = caches.open(cacheName).then((cache) => {

		return cache.match(event.request).then((resource) => {

			if(resource){
            return resource; 
         } 

			return fetch(event.request).then((resource) => {
				cache.put(event.request, resource.clone());
				return resource;
			});

		});

	});
	event.respondWith(response);
});
