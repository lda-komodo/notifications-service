import { GameLevelUpEvent } from '../../events/types';

export interface ProcessLevelUpEventInterface {
  processLevelUpEvent(gameLevelUpEvent: GameLevelUpEvent): Promise<void>;
}
