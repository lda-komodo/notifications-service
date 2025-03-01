export class MessageTemplateMapper {
  constructor(private readonly template: string) {}

  generateMessage(placeholders: Object): string {
    return Object.entries(placeholders)
      .map(([key, value]) => ({
        regex: new RegExp(`\{\{${key}\}\}`, 'g'),
        value,
      }))
      .reduce(
        (message, { regex, value }) => message.replace(regex, value),
        this.template,
      );
  }
}
