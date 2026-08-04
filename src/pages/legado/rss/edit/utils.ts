import pickBy from 'lodash-es/pickBy';
import type { ILegadoRss, ILegadoRssFormValues } from '../type';

export const transformSubmitValues = (params: ILegadoRssFormValues) => {
  const data = {
    ...params,

    sourceGroup: params.sourceGroup?.join(),

    updateTime: Date.now(),
  } as ILegadoRssFormValues;
  return pickBy(data, (v) => !!v) as ILegadoRss;
};

export const transformSourceItemToFormValues = (
  values: ILegadoRss,
): ILegadoRssFormValues => {
  return {
    ...values,
    sourceGroup: values.sourceGroup?.split(',') || [],
  } as ILegadoRssFormValues;
};
