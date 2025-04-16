import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class SidebarDataExplorerEdit extends Component {
  @tracked selectedQueries = [];

  constructor() {
    super(...arguments);
    this.selectedQueries = [...this.args.model.selectedQueries];
  }

  @action
  toggleQuery(query) {
    const index = this.selectedQueries.indexOf(query.id);
    
    if (index === -1) {
      this.selectedQueries = [...this.selectedQueries, query.id];
    } else {
      this.selectedQueries = this.selectedQueries.filter(id => id !== query.id);
    }
  }

  @action
  save() {
    this.args.model.save(this.selectedQueries);
    this.args.closeModal();
  }

  @action
  cancel() {
    this.args.closeModal();
  }
} 