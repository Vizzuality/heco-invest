import { Controller } from "@hotwired/stimulus"
import { convertFilesToGeojson } from "../utils/shapefile";

// Connects to data-controller="shapefile"
export default class extends Controller {
  static targets = [ "output", "input" ]

  upload() {
    this.inputTarget.click();
  }

  readFiles() {
    var input = this.inputTarget;
    var output = this.outputTarget;

    convertFilesToGeojson(Array.from(input.files)).then((res) => {
      output.value = JSON.stringify(res);
    }).catch((error) => {
      console.error(error);
    });
  }
}
