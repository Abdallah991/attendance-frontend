import { Injectable } from '@angular/core';
// import { candidates } from 'src/app/constants/api';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  download = function (data) {
    // Creating a Blob for having a csv file format
    // and passing the data with type
    const blob = new Blob([data], { type: 'text/csv' });

    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob);

    // Creating an anchor(a) tag of HTML
    const a = document.createElement('a');

    // Passing the blob downloading url
    a.setAttribute('href', url);

    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', 'applicants.csv');

    // Performing a download with click
    a.click();
  };

  csvmaker = function (data) {
    // Empty array for storing the values
    var csvRows = [];

    // Headers is basically a keys of an
    // object which is id, name, and
    // profession
    const headers = Object.keys(data[0]);

    console.log(headers);
    // As for making csv format, headers
    // must be separated by comma and
    // pushing it into array
    csvRows.push(headers.join(','));
    console.log(csvRows);

    // Pushing Object values into array
    // with comma separation
    data.forEach((applicant) => {
      const values = Object.values(applicant).join(',');
      csvRows.push(values);
    });

    // Returning the array joining with new line
    return csvRows.join('\n');
  };

  get = async function (data) {
    const csvdata = this.csvmaker(data);
    this.download(csvdata);
  };
}
