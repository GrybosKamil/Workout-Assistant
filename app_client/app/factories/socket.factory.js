'use strict';

(function () {

    angular.module('socketFactory', ['btford.socket-io'])
        .factory('Socket', socket);

    socket.$inject = ['socketFactory'];
    function socket(socketFactory) {
        let socket = socketFactory();
        // socket.forward('android-apk');
        return socket;
        // return socketFactory({
        //     prefix: '',
        //     // ioSocket: io.connect('http://localhost:3000')
        // });

    }

})();
