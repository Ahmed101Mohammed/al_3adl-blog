const resizeImageWithHeight = (imgUrl, height, container) =>
{
    const img = new Image();
    img.src = imgUrl;
    img.onload = () =>
    {
        const originalWidth = img.width;
        const originalHeight = img.height;
        const whRetio = originalWidth / originalHeight;
        const width = height * whRetio;

        let leftShifting = (originalWidth - width)/2 > 0? (originalWidth - width)/2 : 0;
        let topShifting = (originalHeight - height)/2 > 0? (originalHeight - height)/2 : 0;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, leftShifting, topShifting, width, height, 0, 0, width, height);
        const imgUrl = canvas.toDataURL("image/*", 1);
        container.insertAdjacentHTML('beforeend', `<img src="${imgUrl}"/>`);
    }

    img.onerror = () =>
    {
        return imgUrl;
    }
}

const resizeImageWithHeightAndFixedWidth = (imgUrl, height, container) =>
    {
        const img = new Image();
        img.src = imgUrl;
        img.onload = () =>
        {
            const originalWidth = img.width;
            const originalHeight = img.height;

            let topShifting = (originalHeight - height)/2 > 0? (originalHeight - height)/2 : 0;
    
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = originalWidth;
            canvas.height = height;
            ctx.drawImage(img, 0, topShifting, originalWidth, height, 0, 0, originalWidth, height);
            const imgUrl = canvas.toDataURL("image/*", 1);
            container.insertAdjacentHTML('beforeend', `<img src="${imgUrl}"/>`);
        }
    
        img.onerror = () =>
        {
            container.insertAdjacentHTML('beforeend', `<img src="${imgUrl}"/>`);
        }
    }