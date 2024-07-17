const resizeImageWithHeight = async(imgUrl, height) =>
{
    console.log({imgUrl, height});
    const img = new Image();
    img.src = imgUrl;
    img.onload = async() =>
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
        console.log({imgUrl});
        return imgUrl;
    }

    img.onerror = () =>
    {
        return imgUrl;
    }
}