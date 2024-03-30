import { CONTENT_URL } from "api";
import { IProduct } from "types";

export const getProductPreviewImgUrl = ({ id }: IProduct) => `${CONTENT_URL}/${id}_Preview.jpg`;