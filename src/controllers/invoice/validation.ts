export class GetSignedUrlConfig {
    action!: "read" | "write" | "delete" | "resumable";
    expires!: '01-01-2050';
}