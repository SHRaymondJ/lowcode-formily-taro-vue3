import { ICustomEvent } from '@/design/shared/src'
import { AbstractHistoryEvent } from './AbstractHistoryEvent'

export class HistoryGotoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:goto'
}
