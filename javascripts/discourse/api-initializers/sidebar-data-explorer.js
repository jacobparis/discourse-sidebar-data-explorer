import { apiInitializer} from "discourse/lib/api";
import { ajax } from "discourse/lib/ajax";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import SidebarDataExplorerEdit from "../components/sidebar-data-explorer-edit";

export default apiInitializer((api) => {
  if (api.getCurrentUser()?.admin) {
    api.addSidebarSection((BaseCustomSidebarSection, BaseCustomSidebarSectionLink) => {
      return class extends BaseCustomSidebarSection {
        @service modal;
        @tracked queries = [];
        @tracked selectedQueryIds = [];

        constructor() {
          super();
          this.loadQueries();
          this.loadSelectedQueries();
        }

        async loadQueries() {
          const result = await ajax('/admin/plugins/explorer/queries');
          this.queries = result.queries;
        }

        loadSelectedQueries() {
          const saved = localStorage.getItem("sidebar_data_explorer_queries");
          this.selectedQueryIds = saved ? JSON.parse(saved) : [];
        }

        saveSelectedQueries(queryIds) {
          localStorage.setItem("sidebar_data_explorer_queries", JSON.stringify(queryIds));
          this.selectedQueryIds = queryIds;
        }

        get name() {
          return "data-explorer";
        }

        get text() {
          return "Data Explorer";
        }

        get actions() {
          return [
            {
              id: 'new-query',
              title: 'New Query',
              action: () => {
                this.modal.show(SidebarDataExplorerEdit, {
                  model: {
                    queries: this.queries,
                    selectedQueries: this.selectedQueryIds,
                    save: (selectedQueries) => {
                      this.saveSelectedQueries(selectedQueries);
                    }
                  }
                });
              }
            }
          ];
        }

        get actionsIcon() {
          return "pencil";
        }

        get links() {
          return this.queries
            .filter(item => this.selectedQueryIds.includes(item.id))
            .map(item => ({
              id: item.id,
              text: item.name,
              icon: 'chart-bar',
              href: `/admin/plugins/explorer/queries/${item.id}`
            }));
        }
      };
    });
  }
}); 