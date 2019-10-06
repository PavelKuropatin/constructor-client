export default function resourceLocationConfig(RestangularProvider, env) {
    "ngInject";
    RestangularProvider.setBaseUrl(env.api);
}
