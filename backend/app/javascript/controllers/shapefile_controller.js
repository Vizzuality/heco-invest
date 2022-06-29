import { Controller } from "@hotwired/stimulus"
import { convertFilesToGeojson, supportedFileformats } from "../utils/shapefile";

// Connects to data-controller="shapefile"
export default class extends Controller {
  static targets = ["output", "input", "errorMessage", "successMessage", "uploadButton"];
  static values = {
    messages: String
  };

  connect() {
    this.inputTarget.accept = supportedFileformats.map((ext) => `.${ext}`).join(',');
  }

  upload() {
    this.inputTarget.click();
  }

  readFiles() {
    const files = Array.from(this.inputTarget.files);
    const messages = JSON.parse(this.messagesValue);

    const oldUploadText = this.uploadButtonTarget.innerHTML;
    this.uploadButtonTarget.innerHTML = this.uploadButtonTarget.dataset.uploadingText;
    this.successMessageTarget.classList.add("hidden");
    this.errorMessageTarget.classList.add("hidden");
    this.errorMessageTarget.innerHTML = '';

    convertFilesToGeojson(files, messages).then((geojson) => {
      this.outputTarget.value = JSON.stringify(geojson);
      this.successMessageTarget.classList.remove("hidden");
    }).catch((error) => {
      this.errorMessageTarget.innerHTML = error;
      this.errorMessageTarget.classList.remove("hidden");
      console.error(error);
    }).finally(() => {
      this.inputTarget.value = null;
      this.uploadButtonTarget.innerHTML = oldUploadText;
    });
  }
}
