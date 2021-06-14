/**
 * An object that has the data for one loyalty card.
 */
export interface Card {
  /**
   * The display name / identifier for the card.
   */
  name: string;

  /**
   * The type of barcode to use for the card.
   */
  type: string;

  /**
   * The data that will be encoded as a barcode.
   */
  data: string;
}
