function levelToString (level) {
  switch (level) {
    case 1:
      return '街名'
    case 2:
      return '大廈名/村名'
    case 3:
      return '街道名稱'
    case 0:
    default: return '?'
  }
}

function safeFieldValue(obj, key) {
  return obj && obj[key] ? obj[key]: '';
}

function engBuildingNumberFromField(field) {
  if (!field || (!field.BuildingNoFrom && !field.BuildingNoTo)) {
    return '';
  }
  if (field.BuildingNoFrom && field.BuildingNoTo) {
    return `${field.BuildingNoFrom}-${field.BuildingNoTo}`;
  } else {
    return `${field.BuildingNoTo ? field.BuildingNoTo : field.BuildingNoFrom}`;
  }
}


function chineseBuildingNumberFromField(field) {
  if (!field || (!field.BuildingNoFrom && !field.BuildingNoTo)) {
    return '';
  }
  if (field.BuildingNoFrom && field.BuildingNoTo) {
    return `${field.BuildingNoFrom}至${field.BuildingNoTo}號`;
  } else {
    return `${field.BuildingNoTo ? field.BuildingNoTo : field.BuildingNoFrom}號`;
  }
}
/**
 * Format the chinese address from the given result set
 * @param {*} result
 */
function fullChineseAddressFromResult (result) {
  const { Street, Block, Phase, Estate, Village } = result;
  const region = safeFieldValue(result, 'Region');
  const streetName = safeFieldValue(Street, 'StreetName');
  const streetNumber = chineseBuildingNumberFromField(Street);
  const villageName = safeFieldValue(Village, 'VillageName');
  const villageNumber = chineseBuildingNumberFromField(Village);
  const buildingName = safeFieldValue(result, 'BuildingName');

  return `${region}${villageName}${villageNumber}${streetName}${streetNumber}${buildingName}`.trim();
}

/**
 * Format the english address from the given result set
 * @param {*} result
 */
function fullEnglishAddressFromResult (result) {
  const { Street, Block, Phase, Estate, Village } = result;
  const region = safeFieldValue(result, 'Region');
  const streetName = safeFieldValue(Street, 'StreetName');
  const streetNumber = engBuildingNumberFromField(Street);
  const villageName = safeFieldValue(Village, 'VillageName');
  const villageNumber = engBuildingNumberFromField(Village);
  const buildingName = safeFieldValue(result, 'BuildingName');
  return [buildingName,`${streetNumber} ${streetName}`,`${villageNumber} ${villageName}`,region].filter(token => token.match(/\S/)).join(', ');

}

export default {
  levelToString,
  fullChineseAddressFromResult,
  fullEnglishAddressFromResult
}
