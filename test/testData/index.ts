import { readFile, writeFile } from 'fs/promises';

export class MockData {
    private fileData: any = null;
    private path: string;

    constructor(path: string = "./test/testData/game.res.json") {
        this.path = path
    }

    public addGames(data: any) {
        return this.write("games", data)
    }

    public addAchievements(data: any) {
        return this.write("achievements", data)
    }

    public getGames() {
        return this.read("games")
    }
    public getAchievements() {
        return this.read("achievements")
    }

    private async write(key: string, value: any) {
        await this.read()
        const data = {
            ...this.fileData,
            [key]: value
        }

        try {
            await writeFile(this.path, JSON.stringify(data), { flag: "w" })
        } catch (error) {
            throw error
        }
    }

    private async read(key?: string) {
        if (this.fileData === null) {
            try {
                const read = (await readFile(this.path)).toString();
                if (read.length > 1) this.fileData = JSON.parse(read);
                else this.fileData = {};

                if (key) return this.fileData[key]
                else return this.fileData
            } catch (error) {
                throw error
            }
        }
        return key ? this.fileData[key] : this.fileData
    }

}
