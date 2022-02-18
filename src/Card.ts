/**
 * An object that has the data for one loyalty card.
 */
export interface Card {
  /**
   * The unique ID for the card, serves as the index for the form displaying the card.
   */
  id: number;

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
