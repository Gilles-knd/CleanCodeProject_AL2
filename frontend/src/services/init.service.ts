import { HttpService } from "./Http.service";

const http = HttpService.getInstance(process.env.NEXT_PUBLIC_API_URL || "");
export { http };
