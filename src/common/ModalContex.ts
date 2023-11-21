import React from "react";
import { ModalWindowProps } from "../types";
export const ModalContext = React.createContext<ModalWindowProps | undefined>(undefined);
export const ModalConsumer = ModalContext.Consumer;
