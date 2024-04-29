const fs = require('fs');
const {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	ListObjectsCommand,
	DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

/**
 * Class representing AWS file system operations.
 * @class
 * @author Deepak Chaurasiya
 * @email deepak.chaurasiya@indusnet.co.in
 */
class AwsFileSystem {
	/**
	 * Creates an instance of AwsFileSystem.
	 * @constructor
	 * @param {Object} options - Configuration options.
	 * @param {string} options.region - Name of the AWS region.
	 * @param {string} options.bucketName - Name of the AWS bucket.
	 */
	constructor({ region, bucketName }) {
		/**
		 * Name of the AWS bucket.
		 * @type {string}
		 */
		this.bucketName = bucketName;

		/**
		 * AWS S3 client instance.
		 * @type {S3Client}
		 */
		this.s3Client = new S3Client({ region });
	}

	/**
	 * Uploads a file to the S3 Bucket.
	 * @async
	 * @method
	 * @param {Object} options - Parameters for file upload.
	 * @param {Object} options.file - File to upload.
	 * @param {string} [options.folderName=''] - Name of the folder inside which the file will be uploaded.
	 * @param {string} [options.contentType=options.file.mimeType] - Content type of the file.
	 * @returns {Promise<string>} - Key of the uploaded file.
	 * @throws {Error} - If file upload fails.
	 */
	async uploadFile({ file, folderName = '', contentType = file.mimeType }) {
		this.#validateFile(file);
		const fileStream = fs.createReadStream(file.path);
		const key = this.#generateKey({ fileName: file.filename, folderName });
		await this.#uploadToS3({ fileStream, key, contentType });
		await this.#deleteLocalFile(file.path);
		return key;
	}

	/**
	 * Downloads a file from S3 Bucket.
	 * @async
	 * @method
	 * @param {Object} options - Download options.
	 * @param {string} options.key - Key of the file.
	 * @param {string} [options.folderName=''] - Name of the folder where the file is stored in the S3 Bucket.
	 * @returns {Promise<Buffer>} - Buffer containing the downloaded file data.
	 * @throws {Error} - If file download fails.
	 */
	async downloadFile({ key, folderName = '' }) {
		const fileKey = this.#generateKey({ fileName: key, folderName });
		const command = new GetObjectCommand({
			Bucket: this.bucketName,
			Key: fileKey,
		});

		try {
			const { Body } = await this.s3Client.send(command);
			return Body;
		} catch (error) {
			throw new Error(`Failed to download file from S3: ${error.message}`);
		}
	}

	/**
	 * Deletes a file from S3 Bucket.
	 * @async
	 * @method
	 * @param {Object} options - Deletion options.
	 * @param {string} options.key - Key of the file.
	 * @param {string} [options.folderName=''] - Name of the folder where the file is stored in the S3 Bucket.
	 * @throws {Error} - If file deletion fails.
	 */
	async deleteFile({ key, folderName = '' }) {
		const fileKey = this.#generateKey({ fileName: key, folderName });
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: fileKey,
		});

		try {
			await this.s3Client.send(command);
		} catch (error) {
			throw new Error(`Failed to delete file from S3: ${error.message}`);
		}
	}

	/**
	 * Lists files in a folder within the S3 Bucket.
	 * @async
	 * @method
	 * @param {string} folderName - Name of the folder to list files from.
	 * @returns {Promise<Array<string>>} - Array of file keys in the specified folder.
	 * @throws {Error} - If listing files fails.
	 */
	async listFilesInFolder(folderName) {
		const prefix = folderName ? `${folderName}/` : '';
		const command = new ListObjectsCommand({
			Bucket: this.bucketName,
			Prefix: prefix,
		});

		try {
			const response = await this.s3Client.send(command);
			return response.Contents.map((obj) => obj.Key);
		} catch (error) {
			throw new Error(`Failed to list files in folder from S3: ${error.message}`);
		}
	}
	/**
	 * Generates a presigned URL for accessing a file in S3 Bucket.
	 * @async
	 * @method
	 * @param {Object} options - Generation options.
	 * @param {string} [options.folderName=''] - Name of the folder where the file is stored in the S3 Bucket.
	 * @param {string} options.key - Key of the file.
	 * @param {number} [options.expiry=3600] - Expiration time in seconds for the URL (default is 3600 seconds).
	 * @returns {Promise<string>} - Presigned URL for accessing the file.
	 * @throws {Error} - If generating the presigned URL fails.
	 */
	async generatePresignedUrl({ folderName = '', key, expiry = 3600 }) {
		const fileKey = this.#generateKey({ fileName: key, folderName });
		const params = {
			Bucket: this.bucketName,
			Key: fileKey,
			Expires: expiry,
			ResponseContentDisposition: 'inline',
		};

		try {
			const url = await getSignedUrl(this.s3Client, new GetObjectCommand(params));
			return url;
		} catch (error) {
			throw error.message;
		}
	}

	#validateFile(file) {
		if (!file || typeof file !== 'object' || !file.path || !file.filename || !file.mimeType) {
			throw new Error('Invalid file parameter. Please provide a valid file object.');
		}
	}

	#generateKey({ fileName, folderName }) {
		const prefix = folderName ? `${folderName}/` : '';
		return `${prefix}${fileName}`;
	}

	async #uploadToS3({ fileStream, key, contentType }) {
		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			Key: key,
			Body: fileStream,
			ContentType: contentType,
		});

		await this.s3Client.send(command);
	}

	async #deleteLocalFile(filePath) {
		fs.unlink(filePath);
	}
}

const file = new AwsFileSystem();
file.
module.exports = AwsFileSystem;
