/**
 * Extrait le nom du style à partir de l'objet Style
 * @param styleObject Objet style (par exemple { rock: {} })
 * @returns Nom du style avec la première lettre en majuscule
 */
export function getStyleName(styleObject: any): string {
  if (!styleObject) return "Unknown";
  
  // L'objet style a une seule clé qui est le nom du style
  const styleName = Object.keys(styleObject)[0];
  
  // Première lettre en majuscule
  return styleName.charAt(0).toUpperCase() + styleName.slice(1);
}

export function getTxTron(tx:string){
	return tx.slice(0, 6) + '...' + tx.slice(-6);
}