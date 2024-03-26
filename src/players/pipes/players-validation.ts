import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

const regexs = {
  email: (value: string) => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regex.test(value);
  }
}

export class PlayersValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException(`The value of ${metadata.type} should not be empty`);
    else if (!regexs[metadata.data]?.(value)) throw new BadRequestException(`The value of ${metadata.type} should be an email`);
    return value;
  }
}
