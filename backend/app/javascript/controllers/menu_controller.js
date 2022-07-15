import { Controller } from "@hotwired/stimulus"

//simple piece of js code controlling visibility of menu
export default class extends Controller {
  static targets = ["menu"];

  toggle() {
    this.menuTarget.classList.toggle("hidden");
  }

  hide(event) {
    if (!this.element.contains(event.target) && !this.menuTarget.classList.contains('hidden')) {
      this.menuTarget.classList.add("hidden");
    }
  }
}
