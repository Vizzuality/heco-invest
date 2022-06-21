import { Controller } from "@hotwired/stimulus"
import { convertFilesToGeojson } from "../utils/shapefile";

// Connects to data-controller="shapefile"
export default class extends Controller {
  static targets = ["output", "input", "errorMessage", "uploadButton"];
  static values = {
    messages: String
  };

  upload() {
    this.errorMessageTarget.innerHTML = '';
    this.inputTarget.click();
  }

  readFiles() {
    const files = Array.from(this.inputTarget.files);
    const messages = this.messagesValue;

    const oldUploadText = this.uploadButtonTarget.innerHTML;
    this.uploadButtonTarget.innerHTML = this.uploadButtonTarget.dataset.uploadingText;

    convertFilesToGeojson(files, messages).then((geojson) => {
      this.outputTarget.value = JSON.stringify(geojson);
    }).catch((error) => {
      this.errorMessageTarget.innerHTML = error;
      console.error(error);
    }).finally(() => {
      this.inputTarget.value = null;
      this.uploadButtonTarget.innerHTML = oldUploadText;
    });
  }
}
