package usmvolley.upload;

public class FileInformation {

  private String filename;

  private long size;

	public FileInformation() {
	}

	public FileInformation(String filename, long size) {
		super();
		this.filename = filename;
		this.size = size;
	}

	public String getFilename() {
		return filename;
	}
	
	public void setFilename(String filename) {
		this.filename = filename;
	}

	public long getSize() {
		return size;
	}
	
	public void setSize(long size) {
		this.size = size;
	}
}
