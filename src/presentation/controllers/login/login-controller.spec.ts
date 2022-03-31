import { mockLoginParams } from "@/../test/mocks/login/mock-login";
import { RemoteLoginSpy } from "@/presentation/controllers/login/test/remote-login-spy";
import { LoginController } from "@/presentation/controllers/login/login-controller";

describe("Login controller", () => {
  it("Should call RemoteLogin with correct values", async () => {
    const remoteLoginSpy = new RemoteLoginSpy();
    const sut = new LoginController(remoteLoginSpy);

    const request = mockLoginParams();

    remoteLoginSpy.result = true;
    await sut.handle(request);

    expect(remoteLoginSpy.loginParams).toEqual(request);
  });

  it("Should return 200 with correct body if logged in correctly", async () => {
    const remoteLoginSpy = new RemoteLoginSpy();
    const sut = new LoginController(remoteLoginSpy);

    const request = mockLoginParams();

    remoteLoginSpy.result = true;
    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toHaveProperty("result", true);
    expect(httpResponse.body).toHaveProperty("name");
    expect(httpResponse.body).toHaveProperty("accessToken");
  });
});
