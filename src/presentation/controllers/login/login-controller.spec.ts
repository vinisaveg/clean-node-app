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
});
