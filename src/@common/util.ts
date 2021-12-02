import { buildSearchQueryParams, parseQueryParams } from "../@internal/query-params-util";


export type RouteParams<T = any> = { [key: string]: string | number; };

export enum RouteAction {
  ACTION = 'action',
  MODAL_TYPE = 'view',
}

type MakeActionRouteParams = {
  locationSearch: string;
  action?: string;
  routeParams?: RouteParams;
  actionKeyFn?: (action: string) => string;
  actionParamKeyFn?: () => string;
};

/* action helpers */
export const getActionKey = (): string => `${RouteAction.ACTION}-`;

export const getActionRouteParams = (routeParams: RouteParams = {}): RouteParams =>
  Object.entries(routeParams).reduce((acc, [key, value]) => {
    return { ...acc, [key.replace(getActionKey(), '')]: value };
  }, {});

export const parseActionRouteParams = (locationSearch: object): RouteParams => {
  return getActionRouteParams((locationSearch as RouteParams) || {});
};

const buildActionRouteParamsFromRouteParams = (routeParams: RouteParams): RouteParams => {
  if (!Object.keys(routeParams).length) return routeParams;

  return Object.entries(routeParams).reduce((acc, [key, value]) => {
    return { ...acc, [`${getActionKey()}${key}`]: value };
  }, {});
};

export const makeActionRouteParams = ({
  locationSearch,
  actionKeyFn,
  action = '',
  routeParams = {},
  actionParamKeyFn = getActionKey,
}: MakeActionRouteParams): string => {
  const result = {
    ...parseQueryParams(locationSearch),
    ...(action && actionKeyFn && { action: actionKeyFn(action) }),
    ...buildActionRouteParamsFromRouteParams(routeParams),
  } as RouteParams;

  // if no action -> remove all action params while preserving other route params
  if (!action && result.action) {
    delete result.action;
    Object.keys(result).forEach((x) => x.includes(actionParamKeyFn()) && delete result[x]);
  }

  return buildSearchQueryParams(result);
};

/* Modal action helpers */
export const getModalActionKey = (): string => `-${RouteAction.MODAL_TYPE}`;

export const getModalRouteActionValue = (action: string): string =>
  action.replace(getModalActionKey(), '');

export const makeModalRouteAction = (action: string): string => {
  return `${action}${getModalActionKey()}`;
};
