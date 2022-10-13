import lightGallery from 'lightgallery';
import 'lightgallery/css/lightgallery-bundle.css';
export const galleries = document.querySelectorAll('[data-gallery]');
if (galleries.length) {
    galleries.forEach(gallery => {
        lightGallery(gallery, {
            //plugins: [lgZoom, lgThumbnail],
            licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
            speed: 500,
            selector: 'a',
            showCloseIcon: true
        });
    });
}

