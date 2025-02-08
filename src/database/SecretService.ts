import { Injectable } from '@nestjs/common';

import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";

@Injectable()
export class SecretsService { 

  async getDatabaseUrl(): Promise<string> {
    const secretName = process.env.SECRET_NAME;

    if (!secretName) {
      return "";
    }

    const client = new SecretsManagerClient({
        region: "us-east-1",
      });
      
      let response;

      try {
        response = await client.send(
          new GetSecretValueCommand({
            SecretId: secretName,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
        );

        const secret = response.SecretString;

        return secret ?? "";

      } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw new Error(`Erro ao recuperar o segredo do Secrets Manager: ${error.message}`);
      }   
  }
}
