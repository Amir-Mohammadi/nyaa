class SignatureToTopic {
  constructor(
    private deviceId: number,
    private deviceTypeName: string,
    private deviceTypeVersion: string,
  ) {}

  getTopic(signature: string): string {
    var topicName = signature.split('.').last();
    return `devices/${this.deviceTypeName}/v${this.deviceTypeVersion}/${this.deviceId}/${topicName}`;
  }
}

export default SignatureToTopic;
