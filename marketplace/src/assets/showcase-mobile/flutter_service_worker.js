'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "6a7b75e2084f85c5d81d7123ab557133",
  "assets/assets/images/bc_loaders.png": "76567e6a1b5f3c6912ef9d1bf43c1789",
  "assets/assets/images/car.png": "3ed9f71f364a51f2b2552ee34fc59fd3",
  "assets/assets/images/carBlack.png": "26fc3918a9db977cc5060a92c5f61ef8",
  "assets/assets/images/card.png": "89b856d0829120827cb6c578f5587915",
  "assets/assets/images/cardBlack.png": "78b8cdcc766e047bc3761eaed7c70a73",
  "assets/assets/images/ejemplo.svg": "4104639650adba085cf7826bb8ed1f8e",
  "assets/assets/images/example.jpg": "6b72e11c5da755e17e4e55acc0a164ae",
  "assets/assets/images/fenixFour.jpg": "51dc2871dfc915328d974b448b4a199e",
  "assets/assets/images/fenixOne.jpg": "a263e5f75b7869772391d34553f6f168",
  "assets/assets/images/fenixThree.jpg": "d225b56e3fe04322dda585285bcfd076",
  "assets/assets/images/fenixTwo.jpg": "d66163eb3d22c653d832d3a6f71f09cf",
  "assets/assets/images/man.png": "33108516011da8ff89003065fd943fc5",
  "assets/assets/images/manBlack.png": "302dfc487d6928987a40ea1e4722c815",
  "assets/assets/images/pic.jpg": "005c521de7523033fb68bec823e6c6a2",
  "assets/assets/images/showcase/bienvenido.png": "23e1f76a7f48ee671a0ac68e91263423",
  "assets/FontManifest.json": "be09aeaf6b2e75dcb793fe5c9fe2a5a0",
  "assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
  "assets/NOTICES": "76657a897339363a331353cb3db3bccd",
  "assets/packages/bds_mobile/assets/accessibility/en/label.json": "3ced9ff090529cc72460f7837c42d6a1",
  "assets/packages/bds_mobile/assets/accessibility/es/label.json": "cec67916fa9a235779140ad3493b79f8",
  "assets/packages/bds_mobile/assets/accessibility/label.json": "5f97c10b8706d1859f7bfaec441ac230",
  "assets/packages/bds_mobile/assets/example.png": "bb8cd173c313824b7a3ec6ff80587461",
  "assets/packages/bds_mobile/assets/icons/functional/bancolombia-iconos-funcionales.ttf": "15f1e17078f0cc9c2d6e11a6f697e6e2",
  "assets/packages/bds_mobile/assets/icons/ilustration/aceptar_terminos.svg": "16e3ccc087bb3ebf3c019465fdb46aea",
  "assets/packages/bds_mobile/assets/icons/ilustration/activacion_billetera_1.svg": "5b7e377f74a434061b66f742a8b3c1c7",
  "assets/packages/bds_mobile/assets/icons/ilustration/activacion_billetera_2.svg": "e1ddd87e9a99cb16e2d110736e566623",
  "assets/packages/bds_mobile/assets/icons/ilustration/activacion_face_id.svg": "06225e86bfc349d9fbaf2d2d0faa7472",
  "assets/packages/bds_mobile/assets/icons/ilustration/activacion_touch_id.svg": "b4ec0e543869c3b870d64bf73b848ee0",
  "assets/packages/bds_mobile/assets/icons/ilustration/activacion_touch_id_1.svg": "fbb79e8c25eb07b108cadf78594fb785",
  "assets/packages/bds_mobile/assets/icons/ilustration/activacion_touch_id_2.svg": "7c113d1e930cc2965d779328d4acc412",
  "assets/packages/bds_mobile/assets/icons/ilustration/ahorro_carro.svg": "fa1fbb3f0ce205ba30d051da4c8c0a89",
  "assets/packages/bds_mobile/assets/icons/ilustration/amor.svg": "1b610492e5bed75f26b8d757bfc41175",
  "assets/packages/bds_mobile/assets/icons/ilustration/app_proceso.svg": "1a7b8558e1c4f7ab7297289b6a366b39",
  "assets/packages/bds_mobile/assets/icons/ilustration/app_proceso_2.svg": "a9d9868efc754c1998423de9c39a58a4",
  "assets/packages/bds_mobile/assets/icons/ilustration/billetera.svg": "d8006b237bd1571e42783900176140fe",
  "assets/packages/bds_mobile/assets/icons/ilustration/billetera_exitosa.svg": "09ea43fb27314c66a6a55ed94fa5df2f",
  "assets/packages/bds_mobile/assets/icons/ilustration/bloqueos.svg": "9825faa85b9afd4dcca022b3f57cc625",
  "assets/packages/bds_mobile/assets/icons/ilustration/buscar-empresa.svg": "c6cca7ed5ac12069a6158b43cdc1c6cb",
  "assets/packages/bds_mobile/assets/icons/ilustration/clave_dinamica_identificador.svg": "2deb7121f625ca7a1228b586baed31df",
  "assets/packages/bds_mobile/assets/icons/ilustration/codigo-QR.svg": "7e7e7e4f40d666c1703e4fae8b8e62f5",
  "assets/packages/bds_mobile/assets/icons/ilustration/codigo_qr.svg": "7e7e7e4f40d666c1703e4fae8b8e62f5",
  "assets/packages/bds_mobile/assets/icons/ilustration/configura_face_id.svg": "4929d22acb42a24c61648644e487fe5b",
  "assets/packages/bds_mobile/assets/icons/ilustration/configura_face_id_1.svg": "2cbbcb8ca3fd4fcd27378303a5dd24db",
  "assets/packages/bds_mobile/assets/icons/ilustration/configura_face_id_2.svg": "89052c42e59fee44a789364bda3e25f9",
  "assets/packages/bds_mobile/assets/icons/ilustration/configura_touch_id.svg": "07837ba216f5449a20348983ac432ad2",
  "assets/packages/bds_mobile/assets/icons/ilustration/confi_biometria_huella.svg": "4504896edd9df6a90bdf46daa6efcef7",
  "assets/packages/bds_mobile/assets/icons/ilustration/contrasena-mensaje.svg": "6a6c2f163d7e09100f9407df1b62f39d",
  "assets/packages/bds_mobile/assets/icons/ilustration/crecimiento.svg": "a9f44b6471a10f0d4e74eca6a7bad648",
  "assets/packages/bds_mobile/assets/icons/ilustration/credito-preaprobado-online.svg": "7cf506c19db2cb0f6dd35be1f6b0bffa",
  "assets/packages/bds_mobile/assets/icons/ilustration/cumplea%25C3%25B1os.svg": "aae068d3427b0677423427fb9d014d44",
  "assets/packages/bds_mobile/assets/icons/ilustration/enviar_recibir_QR.svg": "cea446fd4a75add5ee9bc4c91eb08fe1",
  "assets/packages/bds_mobile/assets/icons/ilustration/face_id_no_encontrada.svg": "95e999d6bfb03d790a3c98af1c30e026",
  "assets/packages/bds_mobile/assets/icons/ilustration/familia_1.svg": "a733fb20957b661ff0d8a5e854119b75",
  "assets/packages/bds_mobile/assets/icons/ilustration/gestionar_clave_dinamica.svg": "806d5c3c0ba9cff3dc2f616e6d20e4da",
  "assets/packages/bds_mobile/assets/icons/ilustration/ilustracion_app_1.svg": "4dd403081a1b1eb440cf97816e8e6cf0",
  "assets/packages/bds_mobile/assets/icons/ilustration/ilustracion_app_2.svg": "597e9c4828dc6f7cf2bed08858b75489",
  "assets/packages/bds_mobile/assets/icons/ilustration/ilustracion_generica_bc.svg": "7997e087997ff76a6a2ad93f5add2ade",
  "assets/packages/bds_mobile/assets/icons/ilustration/inscribir_factura.svg": "cf452c13dd6088723076911dbd40e3dc",
  "assets/packages/bds_mobile/assets/icons/ilustration/inscribir_factura_2.svg": "927e4fd8d7f845c3bf1ab2debc409ad7",
  "assets/packages/bds_mobile/assets/icons/ilustration/inscribir_factura_3.svg": "0b901e5d05740b7fbc05554368198fba",
  "assets/packages/bds_mobile/assets/icons/ilustration/inscribir_productos.svg": "892e6edbb924f8b52724d92054e02020",
  "assets/packages/bds_mobile/assets/icons/ilustration/inscripcion_clave_dinamica.svg": "d805f49574f7b9dcf8432db26ca8a8ee",
  "assets/packages/bds_mobile/assets/icons/ilustration/inscripcion_clave_dinamica_2.svg": "57410b72dbbca588c79ad64678bc15d4",
  "assets/packages/bds_mobile/assets/icons/ilustration/inscripcion_clave_dinamica_3.svg": "7fb0fc7781684669c8b4744db3ba73df",
  "assets/packages/bds_mobile/assets/icons/ilustration/invitacion_clave_dinamica_softoken.svg": "8d3563c991dd5f14a9c7757ca82067e1",
  "assets/packages/bds_mobile/assets/icons/ilustration/leer_QR.svg": "2d785f3e64e184db468caf04dc47d58e",
  "assets/packages/bds_mobile/assets/icons/ilustration/matrimonio.svg": "6682abe885a63baf397f71947f2e2ef7",
  "assets/packages/bds_mobile/assets/icons/ilustration/navidad.svg": "e5fcb2e65b4de5359d3da3e2556e5f4a",
  "assets/packages/bds_mobile/assets/icons/ilustration/no_eres_cliente.svg": "c1abe9060e0eeb8d9277db8b4b270d54",
  "assets/packages/bds_mobile/assets/icons/ilustration/parati.svg": "e81e269864bdd538484dc69010d0e154",
  "assets/packages/bds_mobile/assets/icons/ilustration/permiso_billetera.svg": "6d73019542458848f16f75b15ee4de43",
  "assets/packages/bds_mobile/assets/icons/ilustration/permiso_camara.svg": "e85c965f4574a8c5c7e31e41033cd2b4",
  "assets/packages/bds_mobile/assets/icons/ilustration/personaliza_regalo.svg": "559b1fce1ebeb0eedfd293ede0d87bf4",
  "assets/packages/bds_mobile/assets/icons/ilustration/primera%2520comunion.svg": "3876d130afde35aa688141a192fee340",
  "assets/packages/bds_mobile/assets/icons/ilustration/proceso_error.svg": "ed80493e234bc19534d73dea4a8053ee",
  "assets/packages/bds_mobile/assets/icons/ilustration/proceso_exitoso.svg": "5ba76441a5211a7e062f85503da2e01f",
  "assets/packages/bds_mobile/assets/icons/ilustration/puntos_colombia.svg": "99263da4ad46503b5beca5ad409d5019",
  "assets/packages/bds_mobile/assets/icons/ilustration/regalo.svg": "4556d9cdbabfb42d1cb323b30e35538a",
  "assets/packages/bds_mobile/assets/icons/ilustration/solicitar_cuentas.svg": "eedc35bcb90be4110832a7484f740470",
  "assets/packages/bds_mobile/assets/icons/ilustration/solicitar_tarjetas.svg": "fcf67873d9b26db567138b29c18e092e",
  "assets/packages/bds_mobile/assets/icons/ilustration/sucursal.svg": "ce68c7eec4a016eee33f829d3e3c8ddc",
  "assets/packages/bds_mobile/assets/icons/ilustration/sv_proceso.svg": "520041b6b4456223ca2c334caf5c704d",
  "assets/packages/bds_mobile/assets/icons/ilustration/tarjetas_1.svg": "6757c384c61f52150f185c5d55900e99",
  "assets/packages/bds_mobile/assets/icons/ilustration/tarjetas_2.svg": "cddd0a76818789a7cf842f2689f5a48f",
  "assets/packages/bds_mobile/assets/icons/ilustration/te%2520doy%2520mi%2520mano.svg": "0ed87eb6c3eed529fb5894882230b041",
  "assets/packages/bds_mobile/assets/icons/ilustration/ubicacion_movilidad.svg": "147cb3d55171b4eceb5f9546ecae96b1",
  "assets/packages/bds_mobile/assets/icons/ilustration/uso_efectivo.svg": "e6c6ced48ff894ebba189cb2bd9e251b",
  "assets/packages/bds_mobile/assets/icons/ilustration/withdraw-cash-atm.svg": "375a44e5a5cc353703c4af39009fb7a9",
  "assets/packages/bds_mobile/assets/icons/pictogramas/affinity.svg": "d766e7cc4b89440a291c73bc1c495a0d",
  "assets/packages/bds_mobile/assets/icons/pictogramas/apartaestudio.svg": "0b788bdccd694c51e478eaa95e79ea8e",
  "assets/packages/bds_mobile/assets/icons/pictogramas/apartamento.svg": "98fa3b13a780042872e8dc34de60d172",
  "assets/packages/bds_mobile/assets/icons/pictogramas/app-update.svg": "d82b2c7ca6d58b9ed1c4e74a6f282feb",
  "assets/packages/bds_mobile/assets/icons/pictogramas/badge.svg": "a8e245826bc8989b62b978a19d5979a7",
  "assets/packages/bds_mobile/assets/icons/pictogramas/bloqueos.svg": "9f929eed0869150dc7313aa319b9477b",
  "assets/packages/bds_mobile/assets/icons/pictogramas/casa.svg": "957da6a95c13760ebc7b7725f9380cfd",
  "assets/packages/bds_mobile/assets/icons/pictogramas/error.svg": "7388f3cd57a5ba13457b32f3429daace",
  "assets/packages/bds_mobile/assets/icons/pictogramas/hogar.svg": "697d8a9b3573d8815b642df1614745fc",
  "assets/packages/bds_mobile/assets/icons/pictogramas/huella.svg": "208c9cc0e9e1a51f8e542cf797b2f891",
  "assets/packages/bds_mobile/assets/icons/pictogramas/idea.svg": "cc5629db839ba68b65aeb261e0887034",
  "assets/packages/bds_mobile/assets/icons/pictogramas/idioma.svg": "88b859eb95ef2c05bc61a3546890860f",
  "assets/packages/bds_mobile/assets/icons/pictogramas/location.svg": "b2a788116302ab751e67abd33768df35",
  "assets/packages/bds_mobile/assets/icons/pictogramas/mano_4.svg": "d5ff6de7e6496530daad198a48945098",
  "assets/packages/bds_mobile/assets/icons/pictogramas/mano_5.svg": "571e75bde26ac286f100261dac7bbcd5",
  "assets/packages/bds_mobile/assets/icons/pictogramas/ok.svg": "e6c5cfa258e26e143badcb6c6d929e14",
  "assets/packages/bds_mobile/assets/icons/pictogramas/plant.svg": "430bb6415027ec90b5065403b6f52277",
  "assets/packages/bds_mobile/assets/icons/pictogramas/plus.svg": "495a0f8e78a7634b14c0da21cdcbbfad",
  "assets/packages/bds_mobile/assets/icons/pictogramas/rocket.svg": "900d52e16b0126e0a67b2ef70267056c",
  "assets/packages/bds_mobile/assets/icons/pictogramas/search.svg": "f0fa07af553e53ef94b185a01e0790a7",
  "assets/packages/bds_mobile/assets/icons/pictogramas/shield-money.svg": "fd9698fc4a8790b00ac912e4e0724a61",
  "assets/packages/bds_mobile/assets/icons/pictogramas/shield-user.svg": "86f846f457fc3a7de0b9c36701d62a9a",
  "assets/packages/bds_mobile/assets/icons/pictogramas/stone.svg": "cc27a8d2ec3c2e11334cac827b637562",
  "assets/packages/bds_mobile/assets/icons/pictogramas/time.svg": "fa741d9c3b9c6a5575e8d53296cc4a72",
  "assets/packages/bds_mobile/assets/icons/pictogramas/usuario.svg": "486e1ba52177780f6b0cf3c56179ac36",
  "assets/packages/bds_mobile/assets/icons/trazo/01.json": "49b99c09daa827ef93513aace79047dd",
  "assets/packages/bds_mobile/assets/icons/trazo/01.svg": "92270ed5ba6eb4ecced054522ffe0326",
  "assets/packages/bds_mobile/assets/icons/trazo/02.json": "f26b21d27f2f930cce31cb0f08ab077c",
  "assets/packages/bds_mobile/assets/icons/trazo/02.svg": "ff4f74bfccc794a471ac29fff59fa8dc",
  "assets/packages/bds_mobile/assets/icons/trazo/03.json": "62cb5f8e408cda01a82c5811b7f174a4",
  "assets/packages/bds_mobile/assets/icons/trazo/03.svg": "ad17f5ef356670741b152f93ed9c1ae8",
  "assets/packages/bds_mobile/assets/icons/trazo/04.json": "e33f0dbf455dcf4a3ef4e98ee48e9e21",
  "assets/packages/bds_mobile/assets/icons/trazo/04.svg": "dad543073568648557a918b484049f2d",
  "assets/packages/bds_mobile/assets/icons/trazo/04_animate.json": "1fa341f3226a4d51a83b5072aa2644d1",
  "assets/packages/bds_mobile/assets/icons/trazo/05.json": "788201afdc0766a8406922e0a9a0f50a",
  "assets/packages/bds_mobile/assets/icons/trazo/05.svg": "3d40ee484292463911a415a22efbe8d2",
  "assets/packages/bds_mobile/assets/icons/trazo/06.json": "f766ac3495aff4e48fe6960dcecdfd39",
  "assets/packages/bds_mobile/assets/icons/trazo/06.svg": "2adcc2c10e69215ca57bf7517ad4fe6e",
  "assets/packages/bds_mobile/assets/icons/trazo/06_animate.json": "dcc4ab2adf8dbd0481215f63a1f9011d",
  "assets/packages/bds_mobile/assets/icons/trazo/07.json": "378fbce21d4c4957c79a46450e56707f",
  "assets/packages/bds_mobile/assets/icons/trazo/07.svg": "8f2dcf5fa83c9d937bb047c9491677cc",
  "assets/packages/bds_mobile/assets/icons/trazo/08.json": "6f716fcb7501b64781068800148d2a0d",
  "assets/packages/bds_mobile/assets/icons/trazo/08.svg": "accf145d80bb206c8082fc7b3d178d90",
  "assets/packages/bds_mobile/assets/icons/trazo/09.json": "a6c03d4b63bdc17124066a09084976b9",
  "assets/packages/bds_mobile/assets/icons/trazo/09.svg": "c44e604523abcd78e3556847e12ea56b",
  "assets/packages/bds_mobile/assets/icons/trazo/10.json": "b7f0b127195dc372fd135a68d08ef74e",
  "assets/packages/bds_mobile/assets/icons/trazo/10.svg": "31abe564d00e6be7aae6db17fb37cdc0",
  "assets/packages/bds_mobile/assets/icons/trazo/11.json": "5a37a13865872629e149a712b2d7ef43",
  "assets/packages/bds_mobile/assets/icons/trazo/11.svg": "e5a8d617c99ee50e36f858c15b581c6b",
  "assets/packages/bds_mobile/assets/icons/trazo/trazo_splash.json": "94ac74b03a4b3030e21c13cd7022015e",
  "assets/packages/bds_mobile/lib/tokens/fonts/CIB_Font_Serif/CIBFontSans-Bold.ttf": "36c78a66f91882379f8c5a15fec45b19",
  "assets/packages/bds_mobile/lib/tokens/fonts/CIB_Font_Serif/CIBFontSans-Light.ttf": "69096387df83ff65381f8ee25006b0aa",
  "assets/packages/bds_mobile/lib/tokens/fonts/CIB_Font_Serif/CIBFontSerif-Bold.ttf": "9fa266c98170e43e03f1c942d3c1e39f",
  "assets/packages/bds_mobile/lib/tokens/fonts/Open_Sans/OpenSans-Regular.ttf": "d7d5d4588a9f50c99264bc12e4892a7c",
  "assets/packages/bds_mobile/lib/tokens/fonts/Open_Sans/OpenSans-SemiBold.ttf": "e1c83f9474e0cc1d84a13c6d1ddf3ca5",
  "favicon.png": "5dcef449791fa27946b3d35ad8803796",
  "icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
  "icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
  "index.html": "6fd59347481ab8d0fb7739f0d8fdecc7",
  "/": "6fd59347481ab8d0fb7739f0d8fdecc7",
  "main.dart.js": "79c55f36f440ea46514166297ada7cc9",
  "manifest.json": "19c776c1a1fbbafb96c25f28c07b57f1",
  "version.json": "3bee2d6956727846725a2c740f4e7bc3"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
  "main.dart.js",
  "index.html",
  "assets/NOTICES",
  "assets/AssetManifest.json",
  "assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, { 'cache': 'reload' })));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function (event) {
  return event.waitUntil(async function () {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
