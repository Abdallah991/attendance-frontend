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
    a.setAttribute('download', 'candidates.csv');

    // Performing a download with click
    a.click();
  };

  csvmaker = function (data) {
    // Empty array for storing the values
    var csvRows = [];

    // Headers is basically a keys of an
    // object which is id, name, and
    // profession
    const headers = Object.keys(data);

    // As for making csv format, headers
    // must be separated by comma and
    // pushing it into array
    csvRows.push(headers.join(','));

    // Pushing Object values into array
    // with comma separation
    const values = Object.values(data).join(',');
    csvRows.push(values);

    // Returning the array joining with new line
    return csvRows.join('\n');
  };

  get = async function () {
    const choosenData = [];

    // candidates.data.toad_result_view.forEach((userInfo) => {
    //   var data = {
    //     email: userInfo.user.attrs.email,
    //     firstName: userInfo.user.attrs.firstName,
    //     lastName: userInfo.user.attrs.lastName,
    //     phone: userInfo.user.attrs.Phone,
    //     country: userInfo.user.attrs.country,
    //     dob: userInfo.user.attrs.dateOfBirth,
    //     gender: userInfo.user.attrs.gender,
    //     score: userInfo.score.toFixed(2),
    //     attempts: userInfo.attempts,
    //   };
    //   choosenData.push(data);
    // });

    // JavaScript object
    // TODO: get the number of the applicants
    console.log(choosenData.length);
    console.log(choosenData);
    // TODO: to create csv file
    const csvdata = csvmaker(choosenData);
    download(csvdata);
  };

  // Getting element by id and adding
  // eventlistener to listen everytime
  // button get pressed
  // const btn = document.getElementById('action');
  // btn.addEventListener('click', get);
}

const download = function (data) {
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
  a.setAttribute('download', 'download.csv');

  // Performing a download with click
  a.click();
};

const csvmaker = function (data) {
  // Empty array for storing the values
  var csvRows = [];

  // Headers is basically a keys of an
  // object which is id, name, and
  // profession
  const headers = Object.keys(data[0]);

  // As for making csv format, headers
  // must be separated by comma and
  // pushing it into array
  // TODO: Figure out
  csvRows.push(headers.join(','));

  // Pushing Object values into array
  // with comma separation
  // console.log(data);
  data.forEach(function (row) {
    // csv += row.join(',');
    // csv += "\n";
    csvRows.push(Object.values(row).join(','));
  });
  // const values = Object.values(data).join(',');
  // console.log(values);
  // csvRows.push(values);
  // console.log(csvRows);

  // Returning the array joining with new line
  return csvRows.join('\n');
};

const get = async function () {
  // JavaScript object
  const data = {
    id: 1,
    name: 'Geeks',
    profession: 'developer',
  };

  const csvdata = csvmaker(data);
  download(csvdata);
};
