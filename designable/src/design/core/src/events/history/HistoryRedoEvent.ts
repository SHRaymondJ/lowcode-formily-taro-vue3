import { ICustomEvent } from '@/design/shared/src'
import { AbstractHistoryEvent } from './AbstractHistoryEvent'

export class HistoryUndoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:undo'
}
