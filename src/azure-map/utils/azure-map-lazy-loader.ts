const sources = [
    {
        type: 'style',
        src: 'https://atlas.microsoft.com/sdk/css/atlas.min.css?api-version=1.1'
    },
    {
        type: 'script',
        src: 'https://atlas.microsoft.com/sdk/js/atlas.min.js?api-version=1.1'
    }
];

export function _window(): any {
    return window;
}

export function loadSingleAsset(source: string, type: string) {
    return new Promise((resolve, reject) => {
        let createdElement;
        switch (type) {
            case 'script':
                createdElement = document.createElement('script');
                createdElement.src = source;
                break;
            case 'style':
                createdElement = document.createElement('link');
                createdElement.rel = 'stylesheet';
                createdElement.href = source;
                createdElement.type = 'text/css';
                break;
            default:
                reject('Wrong Type');
                break;
        }
        if (typeof (_window().atlas) !== 'undefined'
            && typeof (_window().atlas.Map) !== 'undefined') {
            resolve();
        } else {
          createdElement.onerror = reject;
          createdElement.onload = resolve;
          document.head.appendChild(createdElement);
        }

    });
}

export function azureMapLazyLoader() {
    return Promise.all(sources.map(source => loadSingleAsset(source.src, source.type)));
}
