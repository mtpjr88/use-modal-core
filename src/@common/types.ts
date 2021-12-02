import { DraggableProps } from 'react-draggable';
import { PropsWithChildren } from 'react';

export enum ModalVariant {
  HALF_SLIDE = 'half-slide-modal',
  FULL_SLIDE = 'full-slide-modal',
  DEFAULT = 'base-modal',
}

export enum ModalCloseMechanism {
  BACKDROP_CLICK = 'backdropClick',
  ICON_CLICK = 'iconClick',
  ESCAPE_KEY_DOWN = 'espcapeKeyDown',
}

export enum ModalAriaLabel {
  id = 'modal-title',
}

export type ModalComponentProps = {
  open: boolean;
  variant: ModalVariant;
  onClose: (e, modalCloseMechanism: ModalCloseMechanism) => void;
  options?: ModalOptions;
  getContainerStyles?: (defaultContainerStyles: React.CSSProperties) => React.CSSProperties;
  getPaperStyles?: (defaultPaperStyles: React.CSSProperties) => React.CSSProperties;
  titleText?: string;
  CloseButton?: (props: CloseButtonProps) => JSX.Element;
  Title?: (props: PropsWithChildren<TitleProps>) => JSX.Element;
  ariaLabel?: string;
};

export type ModalProviderProps = Pick<ModalComponentProps, 'CloseButton' | 'Title'>;

export type OpenModalPayload = {
  body: JSX.Element;
  routeAction?: string | null;
  routeParams?: { [key: string]: string | number };
  handleOnClose?: () => void;
  handleAfterClose?: () => void;
  ariaLabel?: string;
} & Pick<
  ModalComponentProps,
  'options' | 'getPaperStyles' | 'getContainerStyles' | 'titleText' | 'CloseButton' | 'Title'
>;

export type OpenModalHandler = (payload: OpenModalPayload) => void;

export type ModalOptions = {
  closeOnBackdropClick?: boolean;
  draggableOptions?: DraggableProps;
  draggable?: boolean | undefined;
  Backdrop?: React.FC<any>;
};

export type CloseButtonProps = {
  onClick?: (e) => void;
  tabIndex?: number;
};

export type TitleProps = {
  text?: string;
  tabIndex?: number;
};

export type UseModalState = {
  isOpen: boolean;
  body: JSX.Element | null;
  variant: ModalVariant | null;
  handleOnClose?: VoidFunction | undefined;
  handleAfterClose?: VoidFunction | undefined;
  isRouteActionChanging: boolean;
  routeAction?: string | null;
  routeParams?: { [key: string]: string | number };
  routeWhenModalOpened: string | null;
  ariaLabel?: string;
} & Pick<
  ModalComponentProps,
  'options' | 'getContainerStyles' | 'getPaperStyles' | 'titleText' | 'CloseButton' | 'Title'
>;

export type ApplicationIFrameProps = {
  aspectRatio: string;
  heightAdjust: number;
  url: string;
  staticHeightAdjust?: number; // defaults to 60
  onMount?: () => void;
  onLoad?: () => void;
  title?: string;
};

export type OpenModalPayloadWithProps<T> = Omit<OpenModalPayload, 'body'> & {
  bodyProps: T;
};
export interface UseModalDispatch {
  openModal: (payload: OpenModalPayload) => void;
  openDraggableModal: (payload: OpenModalPayload) => void;
  openHalfSlideModal: (payload: OpenModalPayload) => void;
  openFullSlideModal: (payload: OpenModalPayload) => void;
  openApplicationIFrameModal: (payload: OpenModalPayloadWithProps<ApplicationIFrameProps>) => void;
  closeModal: () => void;
}
export type UseModal = [UseModalState, UseModalDispatch];
export type OpenModalDispatchPayload = OpenModalPayload & {
  routeWhenModalOpened: string;
};
export type OpenModalDispatchPayloadWithProps<T> = Omit<OpenModalDispatchPayload, 'body'> & {
  bodyProps: T;
};
