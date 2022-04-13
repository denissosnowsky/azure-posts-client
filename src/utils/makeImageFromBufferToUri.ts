export const makeImageFromBlobToUri = (data: Blob) => {
    return URL.createObjectURL(data);
}