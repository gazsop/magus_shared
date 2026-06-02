export type TRouteConfig = {
	URI: string,
	PORT: number,
	PROTOCOL: string
	readonly GET_URI: string,
	readonly GET_ERROR_URI?: string,
}

type TRouteConfigClient = TRouteConfig & {
	PREVIEW_PORT: number
}


export class Config{
	protected static initialized: boolean = false;

	protected static CONFIG_VARS = {
		devHost: "127.0.0.1",
		host: "pernin.mag.hu",
		devHostPort: 49152,
		hostPort: 6868,
		devClientPort: 49153,
		devClientPreViewPort: 49154,
		clientPort: 6869
	}

	protected static SERVER: TRouteConfig = {
		URI: "",
		PORT: 0,
		PROTOCOL: "",
		get GET_URI(){
			return `${Config.SERVER.URI}:${Config.SERVER.PORT}`;
		},
		get GET_ERROR_URI(){
			return `${Config.SERVER.URI}:${Config.SERVER.PORT}/error`;
		}
	}

	protected static CLIENT: TRouteConfigClient = {
		PROTOCOL: "",
		PORT: 0,
		PREVIEW_PORT: 0,
		get URI(){return Config.SERVER.URI},
		get GET_URI(){
			return `${Config.CLIENT.URI}:${Config.CLIENT.PORT}`;
		},
	}

	public static initialize(mode: "PRODUCTION" | "DEVELOPMENT"){
		if(!Config.initialized){
			Config.SERVER.URI = mode === "PRODUCTION" ?
				Config.CONFIG_VARS.host :
				Config.CONFIG_VARS.devHost;
			
			Config.SERVER.PORT = mode === "PRODUCTION" ? Config.CONFIG_VARS.hostPort : Config.CONFIG_VARS.devHostPort;
			Config.CLIENT.PORT = mode === "PRODUCTION" ? Config.CONFIG_VARS.clientPort : Config.CONFIG_VARS.devClientPort;
			Config.CLIENT.PROTOCOL = mode === "PRODUCTION" ? "https://" : "http://";
			Config.SERVER.PROTOCOL = Config.CLIENT.PROTOCOL;
			
			Config.initialized = true;
			return Config;
		}
	}

	public static get getServer(): TRouteConfig {
		if(!Config.initialized) throw new Error("Config needs to be initialized")
		return Config.SERVER;
	}

	public static get getClient(): TRouteConfigClient {
		if(!Config.initialized) throw new Error("Config needs to be initialized")
		return Config.CLIENT;
	}
}
