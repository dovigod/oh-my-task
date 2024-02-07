export class Task {
  // state :: IDLE IN-PROGRESS COMPLETE
  #progress;
  title;
  description;

  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.#progress = "IDLE";
  }
  getProgress() {
    return this.#progress;
  }
  setProgress(state) {
    return (this.#progress = state);
  }

  objectify() {
    return {
      title: this.title,
      description: this.description,
      progress: this.#progress,
    };
  }
}
