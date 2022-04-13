export const getImageUrlFromDB = (name: string) => {
  return `${process.env.REACT_APP_IMAGES_URL}${name}${process.env.REACT_APP_SAS_TOKEN}`
}
