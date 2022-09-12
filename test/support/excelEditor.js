const Excel = require("exceljs");
const workbook = new Excel.Workbook();

class ExcelEditor {
  async readExcelFile(filePath) {
    await workbook.xlsx.readFile(filePath);
  }

  async getWorkSheet(filePath, sheetName) {
    await this.readExcelFile(filePath);
    return workbook.getWorksheet(sheetName);
  }

  async getLastColumnKey(filePath, sheetName) {
    let sheet = await this.getWorkSheet(filePath, sheetName);
    return sheet.actualColumnCount;
  }

  async getLastLine(filePath, sheetName) {
    let sheet = await this.getWorkSheet(filePath, sheetName);
    return sheet.actualRowCount;
  }

  async readCellFromExcelFile(filePath, sheetName, cell) {
    let sheet = await this.getWorkSheet(filePath, sheetName);
    let val = sheet.getCell(cell).value.toString();
    if (val === "[object Object]") {
      val = sheet.getCell(cell).value.text;
    }
    return val;
  }

  async readCellFromExcelFileAsArray(filePath, sheetName, cell) {
    let sheet = await this.getWorkSheet(filePath, sheetName)
    let val = sheet.getCell(cell).value.toString();
    if (val === '[object Object]') {
      val = sheet.getCell(cell).value.text;
    }
    return val.split(',');
  }

  async readColumnFromExcelFile(filePath, sheetName, key) {
    let sheet = await this.getWorkSheet(filePath, sheetName);
    let col = sheet.getColumn(key);
    let vals = [];
    col.eachCell((cell) => {
      let val = cell.value.toString();
      if (val === "[object Object]") {
        val = cell.value.text;
      }
      vals.push(val);
    });
    vals.splice(0, 1);
    return vals;
  }

  async addRowToExcel(filePath, sheetName, data) {
    let sheet = await this.getWorkSheet(filePath, sheetName);
    await sheet.addRow(data);
    await workbook.xlsx.writeFile(filePath);
    await this.autofitCells(filePath, sheetName);
  }

  async addCellValue(filePath, sheetName, cellNum, value) {
    let sheet = await this.getWorkSheet(filePath, sheetName);
    let cell = sheet.getCell(cellNum);
    cell.value = value;
    await workbook.xlsx.writeFile(filePath);
    await this.autofitCells(filePath, sheetName);
  }

  async autofitCells(filePath, sheetName) {
    let sheet = await this.getWorkSheet(filePath, sheetName);
    sheet.columns.forEach(function (column, i) {
      if (i !== 0) {
        let maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, (cell) => {
          let columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });
  }
}

module.exports = new ExcelEditor();
