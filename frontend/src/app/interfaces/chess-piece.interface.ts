import { PieceTypeEnum } from '../enums';
import { PieceColorEnum } from '../enums/piece-color.enum';

export interface ChessPieceInterface {
  type: PieceTypeEnum;
  color: PieceColorEnum;
}
