export default {
  data() {
    return {
      queryParams: {}
    };
  },
  created() {
    this.queryParams = this.castQueryParams(this.$route.query);
  },
  methods: {
    castQueryParams(params) {
      let castedParams = {};

      if ( params.page !== undefined ) {
        castedParams.page = Number(params.page);
      }

      if ( params.itemsPerPage !== undefined ) {
        castedParams.itemsPerPage = Number(params.itemsPerPage);
      }

      if ( params.sortBy !== undefined ) {
        castedParams.sortBy = [ String(params.sortBy) ];
      }

      if ( params.sortDesc !== undefined ) {
        castedParams.sortDesc = params.sortDesc === "true" ? [true] : [false];
      }

      return castedParams;
    },
    filterQueryParams(params) {
      return Object.fromEntries(
        Object.entries({...params})
          .filter(([, value]) => value != false )
          .map( ([key, value]) => {

            if ( key === "sortBy" || key === "sortDesc" ) {
              return [key, value.join(",")];
            }

            return [key, value];
          })
      );
    }
  }
};
