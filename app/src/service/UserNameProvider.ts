import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';


class UserNameProvider {

    getUserName(): string {
        const config: Config = { dictionaries: [names] };
        return uniqueNamesGenerator(config);
    }
}

export { UserNameProvider };
