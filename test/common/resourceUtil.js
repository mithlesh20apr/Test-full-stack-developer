exports.getPresentation = function (userInfo) {
    return {
       slides: [' demo slides for testing'],
       name: 'Presentation '+ userInfo.userId,
       theme: '../../external/reveal.js/css/theme/white.css',
       transition: 'fade'    
    };
};

exports.uploadResource = function() {
    return {
        title: 'Demo Upload Resource',
        description: 'Demo Description',
        fileName: 'Demo name.txt',
        fileDisplayName: 'Demo Display Name',
        resourceType: 'notes',
        fileExtType: 'Demo Ext Type',
        fileSize: 1000,
        isPublicResource: true
    };
};