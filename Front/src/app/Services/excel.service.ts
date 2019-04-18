import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private httpClient: HttpClient) { }

  public exportAsExcelFile(json: any [], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private download() {
    let headers = new HttpHeaders();
    const url = 'D:\eclipse-workspace\USMVolley\Front\uploads\2 tickets C.pdf';
    headers = headers.set('Accept', 'application/pdf');
    return this.httpClient.get(url, { headers: headers, responseType: 'blob' });

    return this.http.get('http://kmmc.in/wp-content/uploads/2014/01/lesson2.pdf',
    {responseType:ResponseContentType.Blob}).subscribe((data)=>{
        console.log(data);
        var blob = new Blob([data], {type: 'application/pdf'});
        console.log(blob);
        saveAs(blob, "testData.pdf");
    },
    err=>{
        console.log(err);
        }
    );
  }
}
