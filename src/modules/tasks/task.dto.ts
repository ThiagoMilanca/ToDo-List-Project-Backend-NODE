import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class TaskDto {
    @IsString()
    task: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    task?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
