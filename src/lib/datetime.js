import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';

export const datetime = dayjs.extend(AdvancedFormat);
